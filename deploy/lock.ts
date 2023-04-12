import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { time } from '@nomicfoundation/hardhat-network-helpers';

const CONTRACT_NAME = 'Lock';
const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
const ONE_GWEI = 1_000_000_000;

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer, owner } = await getNamedAccounts();

  const startingTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  await deploy(CONTRACT_NAME, {
    contract: 'Lock',
    from: deployer,
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
      viaAdminContract: 'DefaultProxyAdmin',
      execute: {
        init: {
          methodName: 'initialize',
          args: [startingTime, owner],
        },
      },
    },
    value: String(ONE_GWEI),
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = [CONTRACT_NAME];
