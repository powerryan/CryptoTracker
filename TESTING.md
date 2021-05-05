### Crypto Tracker
Trent Resh  
Ben Kupernik  
Ryan Power  
Andrew Rendler

# Testing
  - Steps to run:
      1. `cd cryptotracker`
      2. `. venv/bin/activate`
      3. `pip3 install -r requirements.txt`
      4. `python3 CryptoDataUnitTest.py`
      5. `python3 CryptoCompareAPIUnitTest.py`

---

### CryptoCompareAPIUnitTest

### Use case name
  - Test CryptoCompareAPI Endpoints

### Description
  - Tests the CryptoCompareAPI functionality

### Test steps
  1. Create a new instance on CryptoCompareAPI2
  2. Test the Historical endpoint
  3. Test the News endpoint
  4. Test the Current Price endpoint
  5. Test the rate limit endpoint

### Expected result
   1. CryptoCompareAPI should exist and the value should not be None
   2. All other tests should return a 200 status code

### Actual result
  - Above expectations are met on all test cases

##### Status (Pass/Fail)
  - Pass

---

### CryptoDataUnitTest

### Use case name
  - Verify CryptoData class returns correctly formatted data

### Description
  - Test functions of CryptoData class

### Test steps
  1. Test initialization of CryptoData
  2. Test output of getDic method
  3. Test output of percentChange method
  4. Test output of dollarChange method
  5. Test output of marketCap method
  6. Test output of averageVolume method

### Expected result
   1. CryptoData member variables should not be equal to 0 or have length 0
   2. Dictionary of length 4 should be created
   3. All other tests verify output matches correct format with regex

### Actual result
  - Above expectations are met on all test cases

##### Status (Pass/Fail)
  - Pass


---
### Graph Test

### Use case name
  - Verify graph is displaying live data

### Description
  - Test the main crypto graph

### Pre-conditions
  - User has access to the main webpage

### Test steps
    1. Open index.html
    2. Check the graph has 100 data points
    3. Check the highs are higher than the lows
    4. Check that the open and close prices are accurate

### Expected result
  - 100 data points should be displayed with correct historical data

### Actual result
  - 100 data points are displayed with correct historical data

### Status (Pass/Fail)
  - Pass

---

### Math Section Test

### Use case name
  - Verify the math section displays live data

### Description
  - Test the main crypto math section

### Pre-conditions
  - User has access to the main webpage

### Test steps
    1. Open index.html
    2. Check the current price is displayed
    3. Check the change in price is correct

### Expected result
  - The current price will display the closing price for bitcoin for the last displayed data point and the change in price will be displayed and correct.

### Actual result
  - The current price and change in price is displayed.

### Status (Pass/Fail)
  - Pass
