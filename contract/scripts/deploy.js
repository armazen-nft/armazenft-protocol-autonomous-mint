const hre = require("hardhat");

async function main() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is required locally to deploy. Do not commit or share it.");
  }

  const Gallery = await hre.ethers.getContractFactory("ArmaZENFT");
  const gallery = await Gallery.deploy();
  await gallery.waitForDeployment();
  console.log("ArmaZENFT Gallery deployed to:", await gallery.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
