pragma solidity >0.4.25 <0.6.0;

contract Factory {
    function deploy(bytes memory code,  address addr) public {
        address deployed;
        assembly {
            deployed := create2(0, add(code, 0x20), mload(code), addr)
        }
    }
}