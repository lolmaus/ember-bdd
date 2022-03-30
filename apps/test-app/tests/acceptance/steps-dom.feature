@setupApplicationTest
@setupMirage
Feature: Steps DOM



Background:
  When I visit URL "/"



Scenario: When I click (?:on )?$emberBddLabel
  When I click the Click-Button
  Then there should be a Click-Result



Scenario: When I double click (?:on )?$emberBddLabel
  When I double click the Double-Click-Button
  Then there should be a Double-Click-Result



Scenario: Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel
  Then there should be 2 Items
  Then there should be 1 Item(foo)
  Then there should be a Item(foo)
  Then there should be an Item(foo)
  Then there should be Item(foo)
  Then there should be no Item(bar)



Scenario: When I (?:fill|type) $emberBddString into $emberBddLabel, Then $emberBddLabel should (not |NOT )?(?:have text|say|be) $emberBddString
  Then the Label of the Text-Field should be "Text field"
  And the Input of the Text-Field should say ""
  When I fill "Foo" into the Text-Field
  Then the Input of the Text-Field should be "Foo"



Scenario: When I move the mouse pointer into $emberBddLabel, When I move the mouse pointer out of $emberBddLabel
  Then the Cursor-Target should not have HTML class "-active"
  When I move the mouse pointer into the Cursor-Target
  Then the Cursor-Target should have HTML class "-active"
  When I move the mouse pointer out of the Cursor-Target
  Then the Cursor-Target should not have HTML class "-active"



Scenario: When I focus into $emberBddLabel, When I (?:focus|unfocus|blur) (?:out of|from) $emberBddLabel, Then $emberBddLabel should (not |NOT )?have focus
  Then Click-Button should NOT have focus
  When I focus into Click-Button
  Then Click-Button should have focus
  When I focus out of Click-Button
  Then Click-Button should NOT have focus



Scenario: When I (de)?select (?:the )?(?:radio button|checkbox) $emberBddLabel, Then $emberBddLabel should (not |NOT )?be checked
  Then the Checkbox(unchecked) should NOT be checked
  When I click the Checkbox(unchecked)
  Then the Checkbox(unchecked) should be checked

  Then the Checkbox(checked) should be checked
  When I click the Checkbox(checked)
  Then the Checkbox(checked) should NOT be checked

  Then the Radio(checked) should be checked
  When I click the Radio(checked)
  Then the Radio(checked) should be checked
  And the Radio(unchecked) should NOT be checked

  Then the Radio(unchecked) should NOT be checked
  When I click the Radio(unchecked)
  Then the Radio(unchecked) should be checked
  Then the Radio(checked) should NOT be checked
