import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useUser } from '@/context/UserContext'
import { useAuth } from '@/hooks/useAuth'

const IndexPage = () => {
  const { user } = useUser()
  const { handleGoogleLogin, handleLogout } = useAuth()
  return (
    <Box
      h="100vh"
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.800"
      color="gray.100"
    >
      <Heading as="h1" size="2xl" mb={4} letterSpacing="wider">
        Boilerplate Deployed
      </Heading>
      <Text fontSize="xl" mb={8}>
        Express + Sequelize + Next.js + Chakra UI + Firebase.
      </Text>
      <Box pb="20px">
        {user ? (
          <Flex align="center" direction="column">
            <Box fontWeight="bold" color="green">
              Connected with {user.email}
            </Box>
            <Button mt="1vw" onClick={handleLogout}>
              Se deconnecter
            </Button>
          </Flex>
        ) : (
          <Flex align="center" direction="column">
            <Button onClick={handleGoogleLogin}>Connect with Google</Button>
            <Box fontWeight="bold" color="red" mt="1vw">
              Disconnected
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default IndexPage
