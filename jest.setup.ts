import 'reflect-metadata';
import 'expect-more-jest';
import { install as installSourceMap } from 'source-map-support';

installSourceMap();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
