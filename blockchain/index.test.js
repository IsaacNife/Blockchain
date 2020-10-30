const Blockchain = require('./index');
const Block = require('./block');



describe('Blockchain', () => {
	let  blockchain, bc2;
	beforeEach(() =>  {
		blockchain = new Blockchain();
		bc2 = new Blockchain();
		
		});
	it('start with genesis block', () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());

	});

	it ('adds a new block', () => {
		const data = 'foo';
		blockchain.addBlock(data);

		expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
	});
	it('validates a valid chain', () => {
	bc2.addBlock('foo');
	expect(blockchain.isValidChain(bc2.chain)).toBe(true);
});
it('invalidates a chain with a corrupt genesis block', () => {
	bc2.chain[0].data = 'Bad data';
  expect(blockchain.isValidChain(bc2.chain)).toBe(false);
});

it('invalidates a corrupt chain', () => {
  bc2.addBlock('foo');
  bc2.chain[1].data = 'Not foo';
  expect(blockchain.isValidChain(bc2.chain)).toBe(false);
});
it('replaces the chain with a valid chain', () => {
	bc2.addBlock('goo');
  blockchain.replaceChain(bc2.chain);
  expect(blockchain.chain).toEqual(bc2.chain);
});

it('does not replace the chain with one of less than or equal length', () => {
	blockchain.addBlock('foo');
  blockchain.replaceChain(bc2.chain);
  expect(blockchain.chain).not.toEqual(bc2.chain);
});


});