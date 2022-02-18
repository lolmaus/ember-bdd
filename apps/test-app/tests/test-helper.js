import Application from 'test-app/app';
import config from 'test-app/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import setupEmberBdd from './bdd/setup';
import chai from 'chai';
import chaiDom from 'chai-dom';

chai.use(chaiDom);

setApplication(Application.create(config.APP));

setup(QUnit.assert);

setupEmberBdd();

start();
