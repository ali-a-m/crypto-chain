const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash')

describe('Block', () => {
	const timestamp = 'a-date';
	const lastHash = 'foo-hash';
	const hash = 'bar-hash';
	const data = ['blockchain', 'data'];

	const block = new Block({timestamp, lastHash, hash, data});

	it('has timestamp, lastHash, hash and data', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
	});

	describe('genesis()', () => {
		const genesisBlock = Block.genesis();

		console.log('genesis block: ', genesisBlock);

		it('return a block instance', () => {
			expect(genesisBlock instanceof Block).toBe(true);
		});

		it('return a genesis block', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA)
		})
	});

	describe('mineBlock()', () => {
		const lastBlock = Block.genesis();
		const data = 'mineData';
		const minedBlock = Block.mineBlock({ lastBlock, data });

		it('return a block instance', () => {
			expect(minedBlock instanceof Block).toBe(true);
		});

		it('sets a `lastHash` to be the `hash` of last block', () => {
			console.log(minedBlock.lastHash, lastBlock.hash)
			expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		});

		it('sets the `data`', () => {
			expect(minedBlock.data).toEqual(data);
		});

		it('sets the `timestamp`', () => {
			expect(minedBlock.timestamp).not.toEqual(undefined);
		});

		it('create a sha-256 `hash` based on the proper inputs', () => {
			expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
		});

	});
});