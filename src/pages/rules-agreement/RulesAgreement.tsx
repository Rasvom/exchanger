import { Box, Heading, Text } from '@chakra-ui/react';

const RulesAgreement = () => {
  return (
    <Box p={6}>
      <Heading as='h1' mb={4}>
        Правила и соглашение обменника Exchanger
      </Heading>

      <Heading as='h2' size='lg' mb={3}>
        1. Введение
      </Heading>
      <Text mb={4}>
        Настоящее соглашение (далее Соглашение) регулирует правила использования платформы Exchanger
        и устанавливает права и обязанности пользователей. Принимая условия данного Соглашения,
        пользователь соглашается соблюдать все положения, установленные в нём.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        2. Регистрация и создание учетной записи
      </Heading>
      <Text mb={4}>
        Для использования всех возможностей платформы Exchanger пользователю необходимо создать
        учетную запись, предоставив достоверную информацию.
      </Text>
      <Text mb={4}>
        Пользователь несет ответственность за сохранение конфиденциальности данных своей учетной
        записи, включая пароль.
      </Text>
      <Text mb={4}>
        Пользователь обязуется незамедлительно сообщить о несанкционированном доступе к его учетной
        записи.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        3. Использование услуг обменника
      </Heading>
      <Text mb={4}>
        Услуги обменника предоставляются исключительно для проведения законных операций.
        Пользователю запрещено использовать платформу для участия в любой незаконной деятельности,
        включая отмывание денег и финансирование терроризма.
      </Text>
      <Text mb={4}>
        Пользователь соглашается соблюдать Политику AML и KYC, которая является неотъемлемой частью
        данного Соглашения.
      </Text>
      <Text mb={4}>
        Пользователь обязуется предоставлять актуальную и правдивую информацию, а также обновлять её
        в случае изменения.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        4. Ограничение ответственности
      </Heading>
      <Text mb={4}>
        Exchanger не несет ответственности за убытки, возникшие в результате неправильного
        использования платформы пользователем, включая случаи утраты доступа к учетной записи.
      </Text>
      <Text mb={4}>
        Exchanger не гарантирует бесперебойную работу платформы и не несет ответственности за
        задержки или сбои, вызванные техническими проблемами или внешними обстоятельствами.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        5. Конфиденциальность данных
      </Heading>
      <Text mb={4}>
        Exchanger обязуется соблюдать конфиденциальность персональных данных пользователей в
        соответствии с применимым законодательством о защите данных.
      </Text>
      <Text mb={4}>
        Персональная информация пользователей может быть раскрыта только в случаях, предусмотренных
        законодательством или в рамках соблюдения процедур AML и KYC.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        6. Права и обязанности пользователей
      </Heading>
      <Text mb={4}>
        Пользователь обязуется не нарушать права третьих лиц, включая права интеллектуальной
        собственности.
      </Text>
      <Text mb={4}>
        Пользователь соглашается не использовать платформу для введения других лиц в заблуждение,
        распространения вирусов или других вредоносных программ.
      </Text>
      <Text mb={4}>
        Пользователь имеет право запросить удаление своей учетной записи и персональных данных в
        любое время.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        7. Права Exchanger
      </Heading>
      <Text mb={4}>
        Exchanger оставляет за собой право приостановить или прекратить доступ пользователя к
        платформе при нарушении им условий Соглашения или законодательства.
      </Text>
      <Text mb={4}>
        Exchanger может изменить условия данного Соглашения в любое время. Все изменения вступают в
        силу с момента их публикации на сайте платформы.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        8. Изменения в правилах
      </Heading>
      <Text mb={4}>
        Exchanger оставляет за собой право изменять условия данного Соглашения в любое время.
        Пользователи обязаны следить за актуальными изменениями на сайте платформы.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        9. Разрешение споров
      </Heading>
      <Text mb={4}>
        Все споры, возникающие в связи с настоящим Соглашением, подлежат разрешению в соответствии с
        законодательством юрисдикции, указанной Exchanger.
      </Text>

      <Heading as='h2' size='lg' mb={3}>
        10. Заключительные положения
      </Heading>
      <Text mb={4}>
        Настоящее Соглашение является полным и окончательным соглашением между пользователем и
        Exchanger относительно использования платформы.
      </Text>
      <Text>
        Если какое-либо положение Соглашения признается недействительным или неприменимым, это не
        влияет на действительность остальных положений.
      </Text>
    </Box>
  );
};

export default RulesAgreement;
