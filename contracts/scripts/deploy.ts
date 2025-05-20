import { ethers } from "hardhat";

async function main() {
  // Get the contract factory
  const DexExecutor = await ethers.getContractFactory("DexExecutor");
  
  // For local testing, we'll deploy a mock router first
  const MockRouter = await ethers.getContractFactory("MockRouter");
  const mockRouter = await MockRouter.deploy();
  await mockRouter.waitForDeployment();
  const mockRouterAddress = await mockRouter.getAddress();
  console.log(`MockRouter deployed to: ${mockRouterAddress}`);
  
  // Deploy the DexExecutor with the mock router
  const dexExecutor = await DexExecutor.deploy(mockRouterAddress);
  await dexExecutor.waitForDeployment();

  const address = await dexExecutor.getAddress();
  console.log(`DexExecutor deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 