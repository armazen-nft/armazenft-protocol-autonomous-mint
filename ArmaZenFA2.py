# ArmaZenNFT - Tezos FA2 - Arte focada, custo muito baixo
# Deploy coleção ~1 XTZ cobre storage e gas (Objkt)
# Minting extremamente acessivel, mas nao totalmente gratuito - precisa Kukai wallet com tez
class ArmaZenFA2:
    def __init__(self):
        self.next_id = 1
        self.exhibits = {}
    def mint(self, hash_content, model, uri, creator, is_offerable=False, is_exchangeable=False):
        assert hash_content and model and uri, "hash/model/uri required"
        assert creator, "creator required"
        token_id = self.next_id
        self.exhibits[token_id] = {
            "hash": hash_content,
            "model": model,
            "uri": uri,
            "creator": creator,
            "isOfferable": is_offerable,
            "isExchangeable": is_exchangeable,
            "timestamp": "now",
            "transferable": False  # soulbound - apenas visualizacao se artista quiser
        }
        self.next_id += 1
        return token_id
