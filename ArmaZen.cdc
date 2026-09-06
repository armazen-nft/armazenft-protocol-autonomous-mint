// ArmaZenNFT - Flow Cadence - Zero Gas Sponsored for AI
// Fee: Transaction fee = [1E-4 FLOW + (19.2 * 4E-05 FLOW)] = 8.68E-04 FLOW ~ $0.000179
// Allows zero cost minting via Blockparty sponsorship
pub contract ArmaZenNFT {
  pub struct Exhibit {
    pub let id: UInt64
    pub let hash: String
    pub let model: String
    pub let uri: String
    pub let creator: Address
    pub let isOfferable: Bool
    pub let isExchangeable: Bool
    pub let timestamp: UFix64
  }
  pub var nextId: UInt64
  pub let exhibits: {UInt64: Exhibit}
  pub event Minted(id: UInt64, creator: Address, uri: String)

  init(){
    self.nextId = 1
    self.exhibits = {}
  }

  pub fun mintExhibit(hash: String, model: String, uri: String, isOfferable: Bool, isExchangeable: Bool): UInt64 {
    let id = self.nextId
    self.exhibits[id] = Exhibit(id:id, hash:hash, model:model, uri:uri, creator:self.account.address, isOfferable:isOfferable, isExchangeable:isExchangeable, timestamp:getCurrentBlock().timestamp)
    self.nextId = self.nextId + 1
    emit Minted(id:id, creator:self.account.address, uri:uri)
    return id
  }
}
