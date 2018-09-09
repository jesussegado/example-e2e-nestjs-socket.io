import { Test } from '@nestjs/testing';
import { Utils } from '../utils';
import { EventsModule } from '../../src/events/events.module';
import { SocketService } from '../socket.service';
import { observe } from 'rxjs-marbles/jest';
import { tap, take } from 'rxjs/operators';

describe('Events', () => {
    let socket: SocketService;

    beforeEach(async () => {
        const testingModule = await Test.createTestingModule({
            imports: [EventsModule],
        }).compile();

        await Utils.startServer(testingModule);
        // each test need a new socket connection
        socket = await Utils.createSocket();
    });

    afterEach(async () => {
        // each test need to release the connection for next
        await Utils.closeApp();
    });

    describe('should return a correct event using observe', () => {
        it(
            'when socket is connected',
            observe(() => socket.once('connect').pipe(tap(() => expect(true).toBeTruthy()))),
        );

        it(
            'when socket send normal data',
            observe(() => {
                let counter = 1;

                socket
                    .once('connect')
                    .pipe(tap(() => socket.emit('events', { test: 'test' })))
                    .subscribe();

                return socket.on('events').pipe(
                    take(3),
                    tap(data => expect(data).toBe(counter++)),
                );
            }),
        );
    });

    describe('should return a correct event using toPromise', () => {
        it('when socket is connected', () => {
            return socket
                .once('connect')
                .pipe(tap(() => expect(true).toBeTruthy()))
                .toPromise();
        });

        it('when socket send normal data', () => {
            let counter = 1;

            socket
                .once('connect')
                .pipe(
                    tap(() => {
                        socket.emit('events', { test: 'test' });
                    }),
                )
                .subscribe();

            return socket
                .on('events')
                .pipe(
                    take(3),
                    tap(data => expect(data).toBe(counter++)),
                )
                .toPromise();
        });
    });
});
