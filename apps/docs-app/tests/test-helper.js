import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiDom from 'chai-dom';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(chaiDom);
chai.use(sinonChai);

setApplication(Application.create(config.APP));

start();
