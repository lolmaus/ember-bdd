@setupApplicationTest
@setupMirage
Feature: Steps Config Environment

Scenario: It should do something
  Given the config/environment property "third-party-service" is set to {}
  Given the config/environment property "third-party-service.apiKey" is set to "123xyz"
  Then the config/environment property "third-party-service.apiKey" should be "123xyz"

