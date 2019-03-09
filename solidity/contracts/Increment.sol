pragma solidity >0.4.25 <0.6.0;

contract Increment {
    uint public sum;
    uint public i;

    function increment() public {
        sum = sum + i;
    }

    function setIncrement(uint _i) public {
        i = _i;
    }
}
