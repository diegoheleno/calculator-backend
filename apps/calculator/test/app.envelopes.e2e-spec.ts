import { calculatorRepository } from '../src/repositories/calculator.repository';
import { CommandBus, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { calculatorService } from '../src/services/calculator.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import * as qs from 'qs';
import axios from 'axios';


describe('Testes e2e - calculator API', () => {
  let app: INestApplication;
  let token: string;
  let calculatorRepository: calculatorRepository;

  beforeAll(async () => {
    // Autenticação
    const clientID = process.env.TEST_CLIENT_ID;
    const clientSecret = process.env.TEST_CLIENT_SECRET;

    const credentias = Buffer.from(`${clientID}:${clientSecret}`);
    const base64data = credentias.toString('base64');

    const body = qs.stringify({
      grant_type: 'client_credentials',
      client_id: clientID,
      scope: 'codepipeline-test-level/test-level'
    });

    const { data } = await axios(
      {
        method: 'post',
        url: 'https://focvs-autorization.auth.us-east-1.amazoncognito.com/oauth2/token',
        data: body,
        headers: {
          'Authorization': `Basic ${base64data}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    token = data.access_token;
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        calculatorService, CommandBus, QueryBus, calculatorRepository, EventPublisher, EventBus
      ]
    }).compile();

    calculatorRepository = moduleFixture.get<calculatorRepository>(calculatorRepository);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/upload (POST) deve retornar 200 (Ok)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
  });

  afterAll(async done => {
    app.close();
    done();
  });
});
