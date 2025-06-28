// Test script for TRON Snap staking and voting features

async function testStakingVotingFeatures() {
    console.log('=== TRON Snap Staking & Voting Test ===\n');
    
    // 1. Test staking methods
    console.log('1. Testing Staking Methods:');
    console.log('- tron_stake: Stakes TRX for energy or bandwidth');
    console.log('  Example: stake 100 TRX for ENERGY');
    console.log('  params: { amount: "100", resource: "ENERGY" }\n');
    
    console.log('- tron_unstake: Unstakes TRX (14-day waiting period)');
    console.log('  Example: unstake 50 TRX from ENERGY');
    console.log('  params: { amount: "50", resource: "ENERGY" }\n');
    
    console.log('- tron_withdrawExpiredUnfrozen: Withdraws TRX after 14 days');
    console.log('  No parameters needed\n');
    
    // 2. Test voting methods
    console.log('2. Testing Voting Methods:');
    console.log('- tron_vote: Vote for Super Representatives');
    console.log('  Example: Vote 1000 votes for Binance Staking');
    console.log('  params: { votes: [{ address: "TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH", count: 1000 }] }\n');
    
    // 3. Test information methods
    console.log('3. Testing Information Methods:');
    console.log('- tron_getStakingInfo: Returns current staking status');
    console.log('  Returns: { frozen, frozenEnergy, frozenBandwidth, votes, rewards }\n');
    
    console.log('- tron_getSuperRepresentatives: Returns list of SRs');
    console.log('  Returns: Array of { address, name, totalVotes, ranking, productivity }\n');
    
    // 4. Example integration code
    console.log('4. Example Integration Code:');
    console.log(`
// Stake TRX for Energy
const stakeResult = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId: 'npm:tron-metamask-snap',
        request: {
            method: 'tron_stake',
            params: {
                amount: '100',
                resource: 'ENERGY'
            }
        }
    }
});

// Vote for Super Representatives
const voteResult = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId: 'npm:tron-metamask-snap',
        request: {
            method: 'tron_vote',
            params: {
                votes: [
                    { address: 'TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH', count: 500, name: 'Binance Staking' },
                    { address: 'TZ6p83xJA9kFZYRXfkKGgqwrqmFgDvbRds', count: 300, name: 'Poloniex' }
                ]
            }
        }
    }
});

// Get staking information
const stakingInfo = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
        snapId: 'npm:tron-metamask-snap',
        request: {
            method: 'tron_getStakingInfo'
        }
    }
});
`);
    
    // 5. Key features
    console.log('\n5. Key Features:');
    console.log('✓ Stake TRX for Energy (smart contracts) or Bandwidth (transfers)');
    console.log('✓ 1 TRX = 1 Vote for Super Representatives');
    console.log('✓ 3-day initial lock period for staking');
    console.log('✓ 14-day withdrawal period after unstaking');
    console.log('✓ Vote for top 27 Super Representatives');
    console.log('✓ Change votes anytime without unstaking');
    console.log('✓ Earn rewards from voting');
    
    // 6. Testing flow
    console.log('\n6. Recommended Testing Flow:');
    console.log('1. Connect to TRON Snap');
    console.log('2. Check initial staking info (should be 0)');
    console.log('3. Stake some TRX for ENERGY');
    console.log('4. Check updated staking info');
    console.log('5. Get list of Super Representatives');
    console.log('6. Vote for your preferred SRs');
    console.log('7. Try unstaking (note 14-day period)');
    console.log('8. Test withdrawal (will fail if no expired balance)');
    
    console.log('\n=== Test Complete ===');
}

// Run the test
testStakingVotingFeatures();