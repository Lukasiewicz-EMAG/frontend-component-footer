import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
  'FOOTER_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const { config } = this.context;

    return (
      <footer
        role="contentinfo"
        className="footer">
        <div className="footer-top">
          <nav>
            <ol>
              <li>
                <a href={`${config.LMS_BASE_URL}/privacy`}>
                  {intl.formatMessage(messages.privacyPolicyLinkLabel)}
                </a>
              </li>
              <li>
                <a href={`${config.LMS_BASE_URL}/tos`}>
                  {intl.formatMessage(messages.termsOfServiceLinkLabel)}
                </a>
              </li>
              <li>
                <a href={`${config.LMS_BASE_URL}/accessibility`}>
                  {intl.formatMessage(messages.accessibilityLinkLabel)}
                </a>
              </li>
              <li>
                <a href={`${config.LMS_BASE_URL}/help`}>
                  {intl.formatMessage(messages.termsOfServiceLinkLabel)}
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="copyright-site">{config.FOOTER_URL} ©{new Date().getFullYear()}</div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
