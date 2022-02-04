// @ts-ignore
import Application from '../app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import chai from 'chai';
import chaiDom from 'chai-dom';

chai.use(chaiDom);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
