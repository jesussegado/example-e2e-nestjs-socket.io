import { TestingModule } from '@nestjs/testing/testing-module';
import { INestApplication } from '@nestjs/common/interfaces';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as io from 'socket.io-client';

export class Utils {
    public static socket: SocketIOClient.Socket;
    private static server: express.Express;
    private static app: INestApplication;
    private static module: TestingModule;

    public static async startServer(testingModule: TestingModule) {
        this.module = testingModule;
        this.server = express();
        this.server.use(bodyParser.json());
        this.app = await testingModule.createNestApplication(this.server);
        await this.app.init();
    }

    public static async connectSocket() {
        await this.app.listen(3001);
        this.socket = io.connect(
            'ws://localhost:3001',
            { forceNew: true },
        );
    }
    public static async closeApp() {
        this.socket.close();
        await this.app.close();
    }
}
