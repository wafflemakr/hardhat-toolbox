import { task } from 'hardhat/config';

task('get:owner', 'Get Contract Owner', async ({}, { ethers }) => {
  const lock = await ethers.getContract('Lock');
  const owner = await lock.owner();

  console.log(`Contract Owner ${owner}`);
});

task('set:owner', 'Get Contract Owner', async ({ owner }, { ethers }) => {
  const lock = await ethers.getContract('Lock');
  const prevOwner = await lock.owner();

  const tx = await lock.changeOwner(owner);
  await tx.wait();

  console.log(`Contract Owner changed from ${prevOwner} to ${owner}`);
}).addParam('owner', 'new contract owner');
