<?php


require_once('../../vendor/autoload.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


$dotenv = Dotenv\Dotenv::createImmutable(dirname(__FILE__).'/../../');
$dotenv->load();

$mail = new PHPMailer(true);

try {
  // Obtener los parámetros POST
  $nombre = $_POST['nombre'];
  $email = $_POST['email'];
  $telefono = $_POST['telefono'];
  $loteo = $_POST['loteo'];
  $mensaje = $_POST['mensaje'];

  $smtpHost = $_ENV['SMTP_HOST'];
  $smtpPort = $_ENV['SMTP_PORT']; 
  $smtpUser = $_ENV['SMTP_USER']; 
  $smtpPass = $_ENV['SMTP_PASS']; 


  // Configuración del correo electrónico
  $receiver = 'propiedadeschaitenmaule@gmail.com';
  //$receiver = 'eahumada@seniorti.cl';
  $asunto = "Reserva Santa Victoria -  $nombre";

  $template = file_get_contents(dirname(__FILE__) . '/../templates/contacto.html');

  $template = str_replace('{{nombre}}', $nombre, $template);
  $template = str_replace('{{email}}', $email, $template);
  $template = str_replace('{{telefono}}', $telefono, $template);
  $template = str_replace('{{loteo}}', $loteo, $template);
  $template = str_replace('{{mensaje}}', $mensaje, $template);



  //Server settings
  $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
  $mail->isSMTP();                                            //Send using SMTP
  $mail->Host       = $smtpHost;                     //Set the SMTP server to send through
  $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
  $mail->Username   = $smtpUser;                     //SMTP username
  $mail->Password   = $smtpPass;                               //SMTP password
  $mail->SMTPSecure = "SSL";            //Enable implicit TLS encryption
  $mail->Port       = $smtpPort;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

  //Recipients
  $mail->setFrom($smtpUser, 'Reserva Santa Victoria');
  $mail->addAddress($receiver);     //Add a recipient
  $mail->addReplyTo($email, $nombre);

  //Content
  $mail->isHTML(true);                                  //Set email format to HTML
  $mail->Subject = $asunto;
  $mail->Body    = $template;
  $mail->AltBody = "
  Ha recivido un mensaje desde el sitio wew www.reservasantavictoria.cl

  Nombre: $nombre \n
  Email: $email \n
  Teléfono: $telefono \n
  Loteo: $loteo \n
  Mensaje: $mensaje \n
  ";

  $mail->send();

  http_response_code(200);
  echo 'El correo ha sido enviado correctamente.';
} catch (\Throwable $th) {
  http_response_code(500);
  echo $th->getMessage();
}
