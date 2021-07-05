import { promisify } from 'util';
import * as Axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import * as JwtTypes from './jwt-types.d';
import config from '../../../../../config';


let cacheKeys: JwtTypes.MapOfKidToPublicKey | undefined;
const getPublicKeys = async (): Promise<JwtTypes.MapOfKidToPublicKey> => {
  
  if (!cacheKeys) {
    const url = `${config.STS_SETTINGS.issuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.default.get<JwtTypes.PublicKeys>(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {instance: current, pem};
      return agg;
    }, {} as JwtTypes.MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

const handler = async (request: JwtTypes.ClaimVerifyRequest): Promise<JwtTypes.ClaimVerifyResult> => {
  let result: JwtTypes.ClaimVerifyResult;
  try {
    const token = request.token;
    const tokenSections = (token || '').split('.');

    if (tokenSections.length < 2) {
      throw new Error('Token inválido');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as JwtTypes.TokenHeader;
    
    // Obtendo as keys
    const keys = await getPublicKeys();
    
    const key = keys[header.kid];
    if (key === undefined) {
      throw new Error('Claim {kid} não encontrada');
    }
    const claim = await verifyPromised(token, key.pem) as JwtTypes.Claim;
    const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error('Token inválido ou expirado');
    }
    if (claim.iss !== config.STS_SETTINGS.issuer) {
      throw new Error('Issuer inválido, verifique a configuração da sua API');
    }
    if (claim.token_use !== 'access') {
      throw new Error('Claim access indica acesso negado');
    }
    console.log(`token validado para ${claim.username}`);
    result = {userName: claim.username, clientId: claim.client_id, isValid: true};
  } catch (error) {
    result = {userName: '', clientId: '', error, isValid: false};
  }
  return result;
};

export {handler};