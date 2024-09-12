import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";

  describe("Contribution", function (){
    async function deployContributionContract(){
        const [owner, addr1, addr2] = await hre.ethers.getSigners()
        const Contribution = await hre.ethers.getContractFactory("Contribution")
        const contribution = await Contribution.deploy();
        return {contribution, owner, addr1, addr2}
    }

    describe("Deployment", function(){
        it("Should make sure msg.sender is the owner", async function () {
            const {contribution, owner, addr1, addr2} = await loadFixture(deployContributionContract)
            expect(await contribution.owner()).to.be.equal(owner.address)
        })
        it("Should make sure only owner can contribute", async function () {
            const {contribution, owner, addr1, addr2} = await loadFixture(deployContributionContract)
            const ehtAmount = hre.ethers.parseEther("1");
            await expect(contribution.connect(addr1).contribute({
                value: ehtAmount
            })).to.be.revertedWith("Only owner can perform this action")
        })

        it("Should make sure amount zero cannot be contributed", async function () {
            const {contribution, owner, addr1, addr2} = await loadFixture(deployContributionContract)
            const ehtAmount = hre.ethers.parseEther("0");
            await expect(contribution.connect(owner).contribute({
                value: ehtAmount
            })).to.be.revertedWith("Cant contribute zero amount")
        })

        it("Should make sure amount is incremented", async function () {
            const {contribution, owner, addr1, addr2} = await loadFixture(deployContributionContract)
            const ehtAmount = hre.ethers.parseEther("0");
            await expect(contribution.connect(addr1).contribute({
                value: ehtAmount
            }))
            // .to.be.revertedWith("Cant contribute zero amount")
            const updatedAmount = await contribution.getUserBalance(addr1.address);
            expect(updatedAmount).to.equal(contribution)
        })
    })
  })