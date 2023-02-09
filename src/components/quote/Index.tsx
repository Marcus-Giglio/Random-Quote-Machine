import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

type QuoteProps = {
  colorBody: string;
  changeBodyColor: () => void;
};

const Quote = (props: QuoteProps) => {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [colorBody, setColorBody] = useState<string>(props.colorBody);
  const [fadeClassActive, setFadeClassActive] = useState<boolean>(false);

  const fadeClass = fadeClassActive ? 'fade-in' : '';

  setTimeout(() => {
    setFadeClassActive(false);
  }, 1000);

  const changeCurrentColor = () => {
    setColorBody(props.colorBody);
  };

  const getQuote = async () => {
    await axios
      .get(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      )
      .then((res) => {
        const randomQuote =
          res.data.quotes[Math.floor(Math.random() * res.data.quotes.length)];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendTweet = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${quote} - ${author}`,
      '_blank'
    );
  };

  const sendTumblr = () => {
    window.open(
      `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${author}&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`,
      '_blank'
    );
  };

  useEffect(() => {
    getQuote();
    setFadeClassActive(true);
  }, []);

  return (
    <div className="row">
      <div className="col-10 col-md-7 col-lg-5 mx-auto" id="quote-box">
        <div className="row">
          <div
            className={'col quote text-center' + ' ' + fadeClass}
            style={{ color: colorBody }}
          >
            <FontAwesomeIcon icon={faQuoteLeft} className="me-2" />
            {quote}
          </div>
        </div>
        <div className="row my-3">
          <div
            className={'col text-end' + ' ' + fadeClass}
            style={{ color: colorBody }}
          >
            - {author}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col text-xs-center mb-xs-2">
                <button
                  className="me-2 button px-2 py-1 rounded-1"
                  style={{ backgroundColor: colorBody }}
                  onClick={() => sendTweet()}
                >
                  <FontAwesomeIcon icon={faTwitter} color="white" />
                </button>
                <button
                  className="button px-2 py-1 rounded-1"
                  style={{ backgroundColor: colorBody }}
                  onClick={() => sendTumblr()}
                >
                  <FontAwesomeIcon icon={faTumblr} color="white" />
                </button>
              </div>
            </div>
          </div>
          <div className="col text-end">
            <button
              disabled={fadeClassActive}
              className="border-0 text-white rounded-1 px-3 py-2"
              style={{ backgroundColor: colorBody }}
              onClick={() => {
                getQuote();
                props.changeBodyColor();
                changeCurrentColor();
                setFadeClassActive(true);
              }}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
