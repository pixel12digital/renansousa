<?php
require_once '../config.php';

// Verificar se usuário está logado
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Administrativo - <?php echo SITE_TITLE; ?></title>
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>
    <div class="admin-container">
        <header class="admin-header">
            <h1>Painel Administrativo</h1>
            <nav>
                <ul>
                    <li><a href="projetos.php">Projetos</a></li>
                    <li><a href="servicos.php">Serviços</a></li>
                    <li><a href="contatos.php">Contatos</a></li>
                    <li><a href="logout.php">Sair</a></li>
                </ul>
            </nav>
        </header>

        <main class="admin-content">
            <h2>Bem-vindo ao Painel Administrativo</h2>
            <div class="dashboard-widgets">
                <!-- Widgets serão adicionados aqui -->
            </div>
        </main>
    </div>
</body>
</html> 