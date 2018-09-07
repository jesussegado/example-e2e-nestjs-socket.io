# Test e2e with [NestJs](https://github.com/nestjs/nest) and [Socket.io](https://github.com/socketio/socket.io)

In this project, you will see a example of how to test webSocket(socket.io) in a nestjs project.
Example obtained from nestjs project ([02-gateway sample](https://github.com/nestjs/nest/tree/master/sample/02-gateways)).

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="130" alt="Nest Logo" /></a>
  <a href="https://socket.io/" target="blank"><img src="https://socket.io/images/favicon.png" width="50" alt="Socket.io Logo" /></a>
</p>

**Links for docummentation**
* [NestJs doc](https://docs.nestjs.com)
* [NestJs GitHub](https://github.com/nestjs/nest)
* [Socket.io doc](https://socket.io)
* [Socket.io](https://github.com/socketio/socket.io)

## Example

```bash
npm install
```

```bash
npm run e2e
```

it should show this result

```bash
> nest-typescript-starter@1.0.0 e2e /home/username/socketExample
> jest --config=jest.e2e.json --maxWorkers=1 --detectOpenHandles

 PASS  e2e/events/events.e2e.spec.ts
  Events
    should return a correct event
      ✓ when socket is connected (99ms)
      ✓ when socket send normal data (74ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.65s, estimated 2s
Ran all test suites.
```
