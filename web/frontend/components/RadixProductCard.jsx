import { Box, Card, Text, Button } from '@radix-ui/themes';

export default function RadixProductCard() {

  return (
    <Box maxWidth="50%">
      <Card asChild>
        <a href="#">
          <Text as="div" size="2" weight="bold">
            Quick start
          </Text>
          <Text as="div" color="gray" size="2">
            Start building your next project in minutes
          </Text>
        </a>
      </Card>
    </Box>
  )
};