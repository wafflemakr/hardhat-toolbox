import { DeployFunction } from 'hardhat-deploy/types';

const CONTRACT_NAME = 'LockV2';

const func: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy(CONTRACT_NAME, {
    contract: 'Lock',
    from: deployer,
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
      viaAdminContract: 'DefaultProxyAdmin',
    },
    log: true,
  });
};

export default func;
func.tags = [CONTRACT_NAME];
