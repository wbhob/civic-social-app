<!DOCTYPE html>
<html>
<head>
    <link href="assets/css/normalize.css" type="text/css" />
        <link href="assets/css/skeleton.css" type="text/css" />
    <link href="assets/css/main.css" type="text/css" />
</head>
<body>
  <?php
$servername = "localhost";
$username = "username";
$password = "password";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>

</body>
</html>
