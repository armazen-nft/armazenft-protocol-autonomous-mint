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

  it("rejects incomplete provenance records", async function () {
    const { gallery, owner } = await deployGallery();
    const hash = ethers.keccak256(ethers.toUtf8Bytes("poe exhibit 003"));

    await assert.rejects(() => gallery.mintExhibit(ethers.ZeroAddress, "ipfs://metadata", hash, "model", "ipfs://provenance"));
    await assert.rejects(() => gallery.mintExhibit(owner.address, "", hash, "model", "ipfs://provenance"));
    await assert.rejects(() => gallery.mintExhibit(owner.address, "ipfs://metadata", ethers.ZeroHash, "model", "ipfs://provenance"));
    await assert.rejects(() => gallery.mintExhibit(owner.address, "ipfs://metadata", hash, "", "ipfs://provenance"));
  });

  it("does not permit an approval to bypass the transfer lock", async function () {
    const { gallery, owner, visitor } = await deployGallery();
    const hash = ethers.keccak256(ethers.toUtf8Bytes("poe exhibit 004"));
    await gallery.mintExhibit(owner.address, "ipfs://metadata", hash, "model", "ipfs://provenance");
    await gallery.approve(visitor.address, 0);

    await assert.rejects(() => gallery.connect(visitor).transferFrom(owner.address, visitor.address, 0));
    assert.equal(await gallery.ownerOf(0), owner.address);
  });
});
