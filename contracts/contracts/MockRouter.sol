// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockRouter {
    // Mock function to simulate swap
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts) {
        // For testing, just return the input amount
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        amounts[path.length - 1] = amountIn;
        return amounts;
    }

    // Mock function to get amounts out
    function getAmountsOut(
        uint amountIn,
        address[] calldata path
    ) external pure returns (uint[] memory amounts) {
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        amounts[path.length - 1] = amountIn;
        return amounts;
    }
} 