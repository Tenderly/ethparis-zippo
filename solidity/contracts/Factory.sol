pragma solidity >0.4.25 <0.6.0;

contract Factory {
    function deploy(bytes memory code, address addr) public {
        address addr;
        assembly {
            addr := create2(0, add(code, 0x20), mload(code), addr)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
    }
}