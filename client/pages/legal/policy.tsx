import getServerSideData from '@/hoc/getServerSideData';
import { Container } from '@ui/Container';
import { HtmlContent } from '@ui/HtmlContent';

export const getServerSideProps = getServerSideData();

const policyPage = () => {
  return (
    <Container>
      <HtmlContent>
        <p>
          <span>
            <b>RarityCase Anti-Money Laundering (AML) Policy</b>
          </span>
        </p>
        <p>
          <span>
            <b>Introduction</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase, as a provider of lottery services, is committed to
            upholding the highest standards of integrity and compliance with
            anti-money laundering laws and regulations. This Anti-Money
            Laundering and Know Your Customer Policy outlines the measures and
            procedures implemented by RarityCase to prevent money laundering and
            ensure thorough customer identification.
          </span>
        </p>
        <p>
          <span>
            <b>Purpose</b>
          </span>
        </p>
        <p>
          <span>The purpose of this policy is to:</span>
        </p>
        <ul>
          <li>
            <p
              style={{
                lineHeight: '100%',
                marginTop: '0.19in',
                marginBottom: '0in',
              }}
            >
              <span>
                Establish and maintain effective procedures for customer
                identification and verification.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Detect and prevent money laundering and other financial crimes
                in the context of lottery services.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Ensure compliance with all relevant AML laws and regulations.
              </span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            <b>Know Your Customer (KYC) Procedures</b>
          </span>
        </p>
        <p>
          <span>
            <b>Customer Identification and Verification</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase will conduct comprehensive customer due diligence using
            KYC procedures, including:
          </span>
        </p>
        <ul>
          <li>
            <p
              style={{
                lineHeight: '100%',
                marginTop: '0.19in',
                marginBottom: '0in',
              }}
            >
              <span>
                Collecting and verifying customer identification information,
                such as name, address, date of birth, and government-issued
                identification documents.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Verifying the authenticity of provided documents through
                reliable sources.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>Identifying the source of funds for transactions.</span>
            </p>
          </li>
        </ul>
        <p>
          <span>
            <b>Enhanced Due Diligence (EDD)</b>
          </span>
        </p>
        <p>
          <span>
            In cases of higher risk or suspicion, RarityCase may implement
            enhanced due diligence measures, such as additional verification
            steps or seeking more information about the customer's financial
            background.
          </span>
        </p>
        <p>
          <span>
            <b>Customer Acceptance Policy</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase will establish a transparent customer acceptance policy,
            clearly outlining the criteria for accepting new customers. This
            policy will include considerations for high-risk customers,
            politically exposed persons (PEPs), and other relevant factors.
          </span>
        </p>
        <p>
          <span>
            <b>Ongoing Monitoring</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase will conduct continuous monitoring of customer
            transactions to detect and report any unusual or suspicious
            activities. This includes regular reviews of transactions for
            patterns that deviate from the customer's normal behavior.
          </span>
        </p>
        <p>
          <span>
            <b>Reporting Suspicious Transactions</b>
          </span>
        </p>
        <p>
          <span>
            If RarityCase identifies any transactions that appear suspicious or
            involve money laundering, the company will promptly report such
            transactions to the appropriate authorities in compliance with
            applicable laws and regulations.
          </span>
        </p>
        <p>
          <span>
            <b>Staff Training and Awareness</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase will provide through training to employees to ensure
            awareness and understanding of AML and KYC policies and procedures.
            Regular updates and training sessions will be conducted to keep
            employees informed about changes in regulations.
          </span>
        </p>
        <p>
          <span>
            <b>Recordkeeping</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase will maintain accurate and up-to-date records of customer
            information, transactions, and AML compliance efforts in accordance
            with applicable laws and regulations.
          </span>
        </p>
        <p>
          <span>
            <b>Communication of AML Policies</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase will communicate its AML and KYC policies to all
            stakeholders, including customers, and make these policies easily
            accessible on the website.
          </span>
        </p>
        <p>
          <span>
            <b>Review and Update</b>
          </span>
        </p>
        <p>
          <span>
            This AML and KYC policy will be regularly reviewed and updated to
            ensure its effectiveness and compliance with evolving laws and
            regulations.
          </span>
        </p>
        <p>
          <span>
            <b>Conclusion</b>
          </span>
        </p>
        <p>
          <span>
            RarityCase is committed to the prevention of money laundering and
            maintaining a secure, transparent, and compliant lottery platform.
            All employees and users are expected to adhere to the outlined
            procedures to uphold the integrity of the lottery services provided
            by RarityCase.
          </span>
        </p>
        <p>
          <br />
          <br />
        </p>
      </HtmlContent>
    </Container>
  );
};

export default policyPage;
