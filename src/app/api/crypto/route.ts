export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids') || 'bitcoin,ethereum,cardano,solana,ripple';
  const days = searchParams.get('days') || '7';

  try {
    // Fetch current market data
    const marketRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_price_change_percentage=true`,
      { next: { revalidate: 300 } }
    );
    const marketData = await marketRes.json();

    // Fetch historical data for charts
    const historicalRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`,
      { next: { revalidate: 300 } }
    );
    const historicalData = await historicalRes.json();

    return Response.json({ marketData, historicalData });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    );
  }
}
