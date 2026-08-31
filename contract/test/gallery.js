const assert = require("node:assert/strict");
const { ethers } = require("hardhat");

describe("ArmaZENFT Gallery", function () {
  async function deployGallery() {
    const [owner, visitor] = await ethers.getSigners();
    const Gallery = await ethers.getContractFactory("ArmaZENFT");
    const gallery = await Gallery.deploy();
    await gallery.waitForDeployment();
    return { gallery, owner, visitor };
  }

  it("registers a curator-approved exhibit with provenance", async function () {
    const { gallery, owner } = await deployGallery();
    const hash = ethers.keccak256(ethers.toUtf8Bytes("poe exhibit 001"));
    await gallery.mintExhibit(owner.address, "ipfs://bafy-metadata", hash, "model-example", "ipfs://bafy-provenance");
    assert.equal(await gallery.ownerOf(0), owner.address);
    assert.equal(await gallery.tokenURI(0), "ipfs://bafy-metadata");
    const exhibit = await gallery.exhibit(0);
    assert.equal(exhibit.contentHash, hash);
    assert.equal(exhibit.modelId, "model-example");
    assert.equal(await gallery.isTransferable(), false);
  });

  it("prevents transfers and non-owner minting", async function () {
    const { gallery, owner, visitor } = await deployGallery();
    const hash = ethers.keccak256(ethers.toUtf8Bytes("poe exhibit 002"));
    await gallery.mintExhibit(owner.address, "ipfs://bafy-metadata", hash, "model-example", "");
    await assert.rejects(() => gallery.transferFrom(owner.address, visitor.address, 0));
    await assert.rejects(() => gallery.connect(visitor).mintExhibit(visitor.address, "ipfs://x", hash, "model", ""));
  });
});
