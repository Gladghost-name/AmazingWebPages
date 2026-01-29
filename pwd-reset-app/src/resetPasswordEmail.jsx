import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Section,
    Text,
    Tailwind,
    Hr,
} from "@react-email/components";
import * as React from "react";
import {useState} from "react";


const VDTResetPassword = () => {
    const [data, setData] = useState(null);
    
    return (
    <Html>
        <Head />
        <Tailwind>
        <Body className="bg-gray-50 my-auto mx-auto font-sans">
            <Container className="bg-white border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto max-w-[600px] overflow-hidden shadow-sm">
            
            {/* Top Accent Bar - Gives the "Pink Theme" feel from Image 1 */}
            <Section className="bg-pink-600 h-2 w-full" />

            <Section className="p-8 pb-0 text-center">
                <Img
                src="https://vdtcomms.com/public/assets/images/vdt-logo.png"
                alt="VDT Logo"
                width="140"
                className="mx-auto"
                />
            </Section>

            <Section className="px-10 py-8">
                
                <Heading className="text-black text-[24px] font-bold text-center mt-0 mb-6">
                    Password Reset 🔒
                </Heading>

                <Text className="text-gray-700 text-[16px] leading-[24px]">
                Hello <strong>FirstName, LastName</strong>,
                </Text>
                
                <Text className="text-gray-700 text-[16px] leading-[24px]">
                We received a request to reset your password for your VDT account. If you made this request, please click the button below:
                </Text>

                {/* Centered Pink Button - Style blended from Image 1 & 2 */}
                <Section className="text-center my-10">
                <Button
                    className="bg-pink-600 rounded-md text-white text-[14px] font-semibold no-underline text-center px-10 py-4"
                    href="https://example.com/reset-password"
                >
                    RESET PASSWORD
                </Button>
                </Section>

                <Hr className="border-gray-200 my-6" />

                <Text className="text-gray-400 text-[12px] leading-[18px]">
                If you did not request a password reset, you can safely ignore this email. Only someone with access to your email can reset your account password.
                </Text>
            </Section>

            {/* Footer with Socials - Inspired by Image 2 */}
            <Section className="bg-gray-50 p-8 text-center border-t border-solid border-[#eaeaea]">
                <Text className="text-gray-400 text-[14px] font-medium mb-4 uppercase tracking-wider">
                Stay Connected
                </Text>
                <Section className="flex justify-center space-x-6 mb-6">
                <Link href="https://www.facebook.com/vdtcomms/" className="mx-2 inline-block">
                    <Img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="24" height="24" alt="Facebook" />
                </Link>
                <Link href="https://www.instagram.com/vdtcomms" className="mx-2 inline-block">
                    <Img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" height="24" alt="Instagram" />
                </Link>
                <Link href="https://x.com/vdtcomms" className="mx-2 inline-block">
                    <Img src="https://abs.twimg.com/responsive-web/client-web/icon-svg.ea5ff4aa.svg" width="24" height="24" alt="Twitter" />
                </Link>
                </Section>
                <Text className="text-gray-400 text-[12px]">
                © 2026 VDT Communications. All rights reserved.<br />
                Lagos, Nigeria.
                </Text>
            </Section>
            </Container>
        </Body>
        </Tailwind>
    </Html>
    );
};

export default VDTResetPassword;