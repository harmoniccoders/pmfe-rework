import {
  Box,
  Divider,
  Text,
  ListItem,
  UnorderedList,
  VStack,
  Link,
  OrderedList,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import NextLink from 'next/link';

const PrivacyPolicy = () => {
  return (
    <Box w="90%" mx="auto" py="5" textAlign="justify">
      <Heading
        color="brand.100"
        fontSize={['1.2rem', '2rem']}
        display="flex"
        gap="3"
      >
        PRIVACY POLICY <MdOutlinePrivacyTip />
      </Heading>
      <Divider my="5" borderColor="black" />
      <Box>
        <Text mb="4" fontWeight="600">
          INTRODUCTION
        </Text>
        <Text fontSize=".94rem" lineHeight="7">
          Welcome to Property mataaz! We are committed to protecting your
          personal information and ensuring your information is kept private and
          secure. This Privacy Policy outlines the type of personal information
          that property mataaz Limited, a subsidiary of oxygen holdings collects
          when operating the.propertymataaz.com website (referred to as "the
          Platform") . Your privacy is extremely important to us. If you have
          any questions, please send us an email at{' '}
          <a
            href="mailto: hello@propertymataaz.com"
            style={{ color: 'blue', fontSize: '.94rem' }}
          >
            hello@propertymataaz.com
          </a>
        </Text>
        <Text fontSize=".94rem" lineHeight="7" mt="3">
          This Privacy Policy governs the manner in which Property mataaz
          collects, uses, maintains and discloses information collected from
          users (each, a "User") of the Platform. This Privacy Policy applies to
          all products and services offered on the Platform.
        </Text>
      </Box>
      <Box>
        <Text mt="5" fontWeight="600">
          SUMMARY
        </Text>
        <Box>
          <Text textDecoration="underline" my="4">
            Information that we collect from you
          </Text>
          <UnorderedList
            fontSize=".94rem"
            spacing="3"
            color="gray.700"
            lineHeight="7"
            ml={['5', '10']}
          >
            <ListItem>
              We collect device-related information, server log information,
              including your IP address, information about your visit (including
              how you got to our websites) and how you use our services. We may
              combine this information with other information you have provided
              to us or which we have received from other sources.
            </ListItem>
            <ListItem>
              Additionally, we collect personal information and financial
              information when you sign up and use your account on the Platform.
              The personal information that you provide may include your name,
              address, email address, phone number and other information about
              you to enable us to provide you with our product search and other
              services.
            </ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Text textDecoration="underline" my="4">
            Why we collect your personal information
          </Text>
          <UnorderedList
            ml={['5', '10']}
            fontSize=".94rem"
            spacing="1"
            color="gray.700"
            lineHeight="7"
          >
            <ListItem>
              We use your personal information to maintain your account, provide
              customer service, and enhance your customer experience.
            </ListItem>
            <ListItem>
              We use aggregate personal information and non-personal information
              to improve the Platform and monitor and protect the security of
              our service.
            </ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Text textDecoration="underline" my="4">
            Who we share your personal information with
          </Text>
          <UnorderedList
            ml={['5', '10']}
            fontSize=".94rem"
            spacing="3"
            color="gray.700"
            lineHeight="7"
          >
            <ListItem>
              We do not sell, rent, or trade your personal information with any
              third parties except as provided in this Privacy Policy, with your
              consent, or as required by law.
            </ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Text my="4" fontWeight="600">
            HOW YOU ACCEPT THIS POLICY
          </Text>
          <Text fontSize=".94rem" lineHeight="7">
            By choosing to use the Platform, or otherwise providing us with
            Registration Information, you hereby consent to the processing of
            your Registration Information, this Privacy Policy and the{' '}
            <NextLink href="/" passHref>
              <Link color="blue">Terms and Conditions</Link>
            </NextLink>{' '}
            for the use of the Platform.
          </Text>
        </Box>
      </Box>
      <Box mt={['10', '16']}>
        <Box>
          <Text mb="4" fontWeight="600">
            INFORMATION WE COLLECT AND WHY
          </Text>
          <Text fontSize=".94rem" lineHeight="7">
            In order to provide a high-quality service, Property mataaz collects
            various types of information when you visit the Platform or sign-up
            as a User.
          </Text>
        </Box>
        <SimpleGrid columns={[1, 2, 2, 3]} spacing="8" mt="4" mb="7">
          <Box fontSize=".94rem" lineHeight="7" shadow="lg" p="7">
            <Text
              textDecoration="underline"
              fontWeight="500"
              color="brand.100"
              mb="4"
            >
              As a Visitor
            </Text>
            <Text>
              We collect various types of anonymous information about visitors
              to the Platform, such as device related information (browser type,
              IP address) and server log information (date and time of day of
              your visit). We also collect information that you input into the
              Platform. We use this information to better understand our
              visitors and our business and to enhance the Platform.
            </Text>
          </Box>
          <Box fontSize=".94rem" lineHeight="7" shadow="lg" p="7">
            <Text
              textDecoration="underline"
              fontWeight="500"
              color="brand.100"
              mb="4"
            >
              As a User
            </Text>
            <Text>
              When you choose to create an account on the Platform, we will also
              collect certain personal information such as:
            </Text>
            <OrderedList ml={['5', '10']} fontSize=".98rem" color="gray.600">
              <ListItem>First Name;</ListItem>
              <ListItem>Last Name;</ListItem>
              <ListItem>Phone Number;</ListItem>
              <ListItem>Email;</ListItem>
              <ListItem>Password;</ListItem>
              <ListItem>Company name.</ListItem>
            </OrderedList>
            <Text>Collectively known as "Registration Information".</Text>
          </Box>
          <Box fontSize=".94rem" lineHeight="7" shadow="lg" p="7">
            <Text
              textDecoration="underline"
              fontWeight="500"
              color="brand.100"
              mb="4"
            >
              Non-Registration Information
            </Text>
            <Text>
              We may collect non-registration information about Users whenever
              they interact with the Platform. Non-registration information may
              include the browser name, the type of computer and technical
              information about Users means of connection to the Platform, such
              as the operating system and the Internet service providers
              utilized and other similar information.
            </Text>
          </Box>
        </SimpleGrid>
        <Box>
          <Text my="4" fontWeight="600">
            COOKIES & PIXELS
          </Text>
          <VStack
            align="flex-start"
            fontSize=".94rem"
            lineHeight="7"
            spacing="4"
          >
            <Text>
              Cookies are small pieces of data that are stored on your computer,
              mobile phone or other device. Pixels are small code blocks on a
              website that allow for another server to measure viewing of a
              webpage and often are used in connection with cookies.
            </Text>
            <Text>
              We use these technologies in order to customize the Platform and
              improve your experience. Cookies store anonymous information, such
              as whether you viewed the Platform from your mobile device or
              computer or tablet. We may store some personal information in a
              cookie and/or pixel, such as the website that you visited
              immediately prior to visiting the Platform and relevant financial
              information that allows us to enhance your user experience and for
              marketing purposes. Additionally, we may use a cookie and/or that
              only stores anonymous information to track visitors across the
              Platform in order to better customize our marketing and
              advertising campaigns.
            </Text>
            <Text>
              Cookies, pixels, and similar technologies are not required for the
              Platform functionality. You are not required to accept any cookies
              or pixels to use the Platform. However, refusing to accept cookies
              or pixels will make the use of the Platform more cumbersome and
              less accessible.
            </Text>
            <Text>
              You may choose to set their web browser to refuse cookies, or to
              alert you when cookies are being sent. If they do so, note that
              some parts of the Platform may not function properly.
            </Text>
          </VStack>
        </Box>
        <Box>
          <Text my="4" fontWeight="600">
            HOW WE USE YOUR REGISTRATION INFORMATION
          </Text>
          <VStack
            align="flex-start"
            fontSize=".94rem"
            lineHeight="7"
            spacing="4"
          >
            <Text>
              We use your registration information to enhance your customer
              experience, operate and maintain your account in accordance with
              Nigerian law , investigate and understand how the Platform is
              used, monitor and protect the security and integrity of the
              Platform, and better market and advertise our services.
            </Text>
            <Text>
              As part of this process, we may from time to time aggregate some
              of your personal information in certain data analysis, reports, or
              other interpretations of investment trends for both internal and
              external purposes. When aggregating personal information, we make
              sure that the information is not identifiable to any particular
              customer.
            </Text>
          </VStack>
        </Box>
        <Box>
          <Text my="4" fontWeight="600">
            WHEN WE SHARE YOUR INFORMATION
          </Text>
          <VStack
            align="flex-start"
            fontSize=".94rem"
            lineHeight="7"
            spacing="4"
          >
            <Text>
              We do not sell, rent, or trade your registration information with
              any third parties without your consent or as required by law .
            </Text>
            <Text>
              In order to provide financial services, we may share your
              registration information with third parties, such as consumer
              identification verification services, for the purpose of serving
              you as a User. We have entered into agreements that require that
              these third parties keep your information confidential.
            </Text>
            <Text>
              We also may disclose some of the registration information we
              collect to service providers, companies that perform marketing and
              analytics services on our behalf, or to other financial
              institutions.
            </Text>
            <Text>
              We may disclose registration information in response to service of
              legal process, such as a court order, summons, subpoenas, or as
              permitted or required by law when we reasonably believe it is
              necessary or appropriate to investigate, prevent, or take action
              regarding illegal activities, suspected fraud, frontrunning or
              scalping, situations involving potential threats to the physical
              safety of any person, or violations of our Terms of Use or
              customer agreements.
            </Text>
            <Text>
              Information about our users, including personal information, may
              be disclosed or transferred to entities now or in the future
              affiliated with Property mataaz or as part of any merger,
              acquisition, change of control, debt financing, insolvency,
              bankruptcy or sale of our assets. Such information may be used in
              the businesses of any entity receiving it.
            </Text>
          </VStack>
        </Box>
        <Box>
          <Text my="4" fontWeight="600">
            CHILDREN
          </Text>
          <VStack
            align="flex-start"
            fontSize=".94rem"
            lineHeight="7"
            spacing="4"
          >
            <Text>
              Our service is not directed towards anyone under the age of 18. If
              a parent or guardian becomes aware that his or her child under the
              age of 18 has created an account with propertymataaz.com and/or
              provided us with personally identifiable information, please
              contact us at{' '}
              <a
                href="mailto: hello@propertymataaz.com"
                style={{ color: 'blue', fontSize: '.94rem' }}
              >
                hello@propertymataaz.com
              </a>
            </Text>
            <Text>
              Additionally, if we become aware at any point that a child under
              the age of 18 is using our service, we will terminate his or her
              account.
            </Text>
          </VStack>
        </Box>
        <Box>
          <Text my="4" fontWeight="600" textAlign="start">
            HOW YOU CAN ACCESS OR CHANGE YOUR REGISTRATION INFORMATION THAT WE
            HAVE COLLECTED
          </Text>
          <VStack
            align="flex-start"
            fontSize=".94rem"
            lineHeight="7"
            spacing="4"
          >
            <Text>
              Once you have registered on Propertymataaz.com, you can access
              your profile, review the information that is stored, and revise
              that information. If you have any problems, you may also contact
              us at{' '}
              <a
                href="mailto: hello@propertymataaz.com"
                style={{ color: 'blue', fontSize: '.94rem' }}
              >
                hello@propertymataaz.com
              </a>
            </Text>
          </VStack>
        </Box>
        <Box>
          <Text my="4" fontWeight="600">
            PROTECTION OF REGISTRATION INFORMATION
          </Text>
          <VStack
            align="flex-start"
            fontSize=".94rem"
            lineHeight="7"
            spacing="4"
          >
            <Text>
              Propertymataaz.com works diligently to protect your registration
              information provided. We employ several physical and electronic
              safeguards to keep your information safe. We use the strongest
              available browser encryption, store all of our data on servers in
              a secure facility, and implement systematic processes and
              procedures for securing and storing data. We limit access to your
              personal and financial information to only those employees with
              authorized access, and we require third parties who perform
              services for Propertymataaz.com to agree to keep your information
              confidential. Furthermore, if you choose to close your account or
              your account is terminated with us, we will continue to adhere to
              the privacy policies and practices outlined here.
            </Text>
            <Box>
              <Text>
                In addition, further to the Data Protection Regulation 2019,
                your Registration Information shall be:
              </Text>
              <UnorderedList
                ml={['5', '10']}
                spacing="3"
                fontSize=".94rem"
                my="4"
                color="gray.600"
              >
                <ListItem>
                  collected and processed in accordance with specific,
                  legitimate and lawful purpose as consented to by you;
                </ListItem>
                <ListItem>
                  adequate, accurate and without prejudice to the dignity of
                  human person;
                </ListItem>
                <ListItem>
                  stored only for the period within which it is reasonably
                  needed and
                </ListItem>
                <ListItem>
                  secured against all foreseeable hazards and breaches such as
                  theft, cyberattack, viral attack, dissemination, manipulations
                  of any kind, damage by rain, fire or exposure to other natural
                  elements.
                </ListItem>
              </UnorderedList>
            </Box>
          </VStack>
        </Box>
        <Box>
          <Text my="4" fontWeight="600">
            YOUR RIGHTS AS A USER
          </Text>
          <VStack
            align="flex-start"
            fontSize=".94rem"
            lineHeight="7"
            spacing="4"
          >
            <Box>
              <Text>Users of the Platform possess the following rights:</Text>
              <UnorderedList
                ml={['5', '10']}
                spacing="3"
                fontSize=".94rem"
                my="4"
                color="gray.600"
              >
                <ListItem>
                  Right to request from Propertymataaz access to and
                  rectification or erasure of your Registration Information;
                </ListItem>
                <ListItem>
                  Right to withdraw consent at any time which shall not affect
                  the processing of your
                </ListItem>
                <ListItem>
                  Registration Information provided with consent before its
                  withdrawal;
                </ListItem>
                <ListItem>
                  Right to lodge a complaint with the National Information
                  Technology Development Agency (NITDA);
                </ListItem>
                <ListItem>
                  Right to object to the processing of your Registration
                  Information for the purpose of marketing;
                </ListItem>
                <ListItem>
                  Right to request for the deletion of your Registration
                  Information;
                </ListItem>
                <ListItem>
                  Right to request for your Registration Information which will
                  be provided in a structured, commonly used and
                  machine-readable format.
                </ListItem>
              </UnorderedList>
            </Box>
          </VStack>
        </Box>
        <Box>
          <Text fontWeight="600">THIRD PARTY WEBSITES</Text>
          <Text my="4" fontSize=".94rem" lineHeight="7">
            Users may find other content on our Platform that links to the sites
            and services of our partners, or other third parties. We do not
            control the content or links that appear on these sites and are not
            responsible for the practices employed by websites linked to or from
            the Platform. In addition, these sites or services, including their
            content and links, may be constantly changing. These sites and
            services may have their own privacy policies and customer service
            policies. Browsing and interaction on any other website, including
            websites which have a link to the Platform, is subject to that
            website's own terms and policies.
          </Text>
        </Box>
        <Box>
          <Text fontWeight="600">ADVERTISING</Text>
          <Text my="4" fontSize=".94rem" lineHeight="7">
            Ads appearing on the Platform may be delivered to Users by
            advertising partners, who may set cookies. These cookies allow the
            ad server to recognize your computer each time they send you an
            online advertisement to compile non-registration information about
            you or others who use your computer. This information allows ad
            networks to, among other things, deliver targeted advertisements
            that they believe will be of most interest to you. This Privacy
            Policy does not cover the use of cookies by any advertisers.
          </Text>
        </Box>
        <Box>
          <Text fontWeight="600">CHANGES TO THE POLICY</Text>
          <Text my="4" fontSize=".94rem" lineHeight="7">
            We may modify this Privacy Policy over time. Any changes to the
            Privacy Policy will be reflected on this page and will become
            effective immediately upon posting. If the changes are significant,
            Propertymataaz.com will do our best to notify you via email or
            through a notification on the Platform or via email. Please check
            the effective date below to determine if there have been any changes
            since you have last reviewed thePropertymataaz.com Privacy Policy.
            You acknowledge and agree that it is your responsibility to review
            this Privacy Policy periodically and become aware of modifications.
          </Text>
        </Box>
        <Box>
          <Text fontWeight="600">INTERNATIONAL VISITORS</Text>
          <Text my="4" fontSize=".94rem" lineHeight="7">
            This Service is hosted in Nigeria. If you are an international
            visitor, you should note that by providing your personal
            information, you are: (i) permitting the transfer of your personal
            information to Nigeria which may not have the same degree of data
            protection laws as the country in which you reside; and (ii)
            permitting the use of your personal information in accordance with
            this Privacy Policy.
          </Text>
        </Box>
        <Box>
          <Text fontWeight="600">YOUR ACCEPTANCE OF THESE TERMS</Text>
          <Text my="4" fontSize=".94rem" lineHeight="7">
            By using the Platform, you signify your acceptance of this Privacy
            Policy. If you do not agree to this Privacy Policy, please do not
            sign up as a User on the Platform. Your continued use of the
            Platform following the posting of changes to this Privacy Policy
            will be deemed your acceptance of those changes.
          </Text>
        </Box>
        <Box pb="4">
          <Text fontWeight="600">CONTACTING US</Text>
          <Text my="4" fontSize=".94rem" lineHeight="7">
            If you have any questions about this Privacy Policy, the practices
            of the Platform, or your dealings with the Platform, please contact
            us at{' '}
            <a
              href="mailto: hello@propertymataaz.com"
              style={{ color: 'blue', fontSize: '.94rem' }}
            >
              hello@propertymataaz.com
            </a>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
