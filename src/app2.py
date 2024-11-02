from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from alpaca_trade_api import REST

# Replace these with your Alpaca API keys
API_KEY = "PKLCVJU4KFGW6P7JO2BW"
API_SECRET = "WvpwMXCyAhV3NjncwihgSldhpaXU4HdYEDozFeUI"
BASE_URL = "https://paper-api.alpaca.markets"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Alpaca API setup
api = REST(API_KEY, API_SECRET, BASE_URL)

def get_stock_news(symbol):
    """Fetch news headlines for the stock symbol using Alpaca API and format as bullet points."""
    try:
        today = datetime.now().date()  # Only date part in YYYY-MM-DD format
        three_days_prior = today - timedelta(days=3)
        start_date = three_days_prior.isoformat()
        end_date = today.isoformat()

        news = api.get_news(symbol=symbol, start=start_date, end=end_date)


        # Format each headline as a bullet point
        if news:
            news_headlines = [f"• {article.headline}" for article in news]
            return news_headlines
        else:
            return ["No recent news found."]
    except Exception as e:
        print("Error fetching news:", e)
        return [f"Unable to retrieve news: {str(e)}"]  # Log the error message

@app.route('/api/get_news', methods=['POST', 'OPTIONS'])
def fetch_news():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'preflight passed'}), 200

    request_data = request.get_json()
    stock_symbol = request_data.get("stockSymbol", "").upper()

    if not stock_symbol:
        return jsonify({'error': 'No stock symbol provided'}), 400

    print(f"Fetching news for stock symbol: {stock_symbol}")

    # Fetch stock news
    news_headlines = get_stock_news(stock_symbol)
    return jsonify({
        'stockSymbol': stock_symbol,
        'newsHeadlines': news_headlines
    }), 200

if __name__ == '__main__':
    app.run(port=5000)
