pragma solidity >0.4.25 <0.6.0;

contract Increment {
    uint sum;
    uint i;

    function increment() public {
        sum = sum + i; 
    }

    function setIncrement(uint _i) public {
        i = _i;
    }
}
