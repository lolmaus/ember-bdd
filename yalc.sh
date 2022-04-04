#!/bin/sh

cd addons/core/
yalc publish && yalc publish

cd ../addons/steps-config-environment/
yalc publish && yalc publish

cd ../addons/steps-dom/
yalc publish && yalc publish

cd ../addons/steps-ember/
yalc publish && yalc publish

cd ../addons/steps-mirage/
yalc publish && yalc publish

cd ../..
