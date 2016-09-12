<!DOCTYPE html>
<html>
<head>
    <link href="assets/css/normalize.css" type="text/css" />
    <link href="assets/css/skeleton.css" type="text/css" />
    <link href="assets/css/main.css" type="text/css" />
    <title>CivicSocial</title>
</head>
<body>
  <?php
      $servername = "civicsocialmysql.wilsonhobbs.com";
      $username = "wilsonhobbs";
      $password = "hobbs8";

      // Create connection
      $conn = new mysqli($servername, $username, $password);

      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
?>

</body>
</html>
