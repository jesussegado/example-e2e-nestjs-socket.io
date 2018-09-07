import { Test } from '@nestjs/testing';
import { Utils } from '../utils';
import { EventsModule } from '../../src/events/events.module';

describe('Events', () => {
    let socket: SocketIOClient.Socket;

    beforeEach(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [EventsModule],
        }).compile();

        await Utils.startServer(testingModule);
        // each test need a new socket connection
        await Utils.connectSocket();
        socket = Utils.socket;
    });

    afterEach(async () => {
        // each test need to release the connection for next
        await Utils.closeApp();
    });

    describe('should return a correct event', () => {
        it('when socket is connected', done => {
            socket.on('connect', () => {
                // this only checks if the expect is executed
                expect(true).toBeTruthy();
                done();
            });
        });
        it('when socket send normal data', done => {
            let counter = 0;
            socket.on('connect', () => {
                socket.emit('events', { test: 'test' });
            });
            socket.on('events', data => {
                // this test will check the expec 3 times before doing 'done' function
                expect(data).toBe(counter + 1);
                // counter is needed for the recusive example
                counter++;
                done();
            });
        });
    });
});
