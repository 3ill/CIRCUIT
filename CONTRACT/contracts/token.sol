// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract token is ERC20Capped, ERC20Burnable {
    uint256 public initialSupply;
    uint256 public immutable maxSupply = 100000000e18;
    uint256 public blockReward = 10e18;
    address public immutable Owner;

    modifier onlyOwner() {
        require(msg.sender == Owner, "Only Owner can call this function");
        _;
    }

    modifier minerCompliance(address _from, address _to) {
        require(
            _from != address(0) &&
                _to != block.coinbase &&
                block.coinbase != address(0),
            "Miner compliance violated"
        );
        _;
    }

    constructor(
        string memory surge,
        string memory SURGE
    ) ERC20(surge, SURGE) ERC20Capped(maxSupply) {
        initialSupply = 70000000e18;
        Owner = msg.sender;
        _mint(Owner, initialSupply);
    }

    function _mint(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Capped) {
        require(
            totalSupply() + amount <= maxSupply,
            "ERC20Capped: cap exceeded"
        );
        super._mint(account, amount);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _value
    ) internal minerCompliance(_from, _to) {
        _mintMinerReward();
        super._beforeTokenTransfer(_from, _to, _value);
    }

    function setBlockReward(uint256 _reward) public onlyOwner {
        blockReward = _reward * (10 ** decimals());
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(Owner).call{value: address(this).balance}(
            ""
        );
        require(success, "This function failed");
    }
}
