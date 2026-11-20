package com.nearme.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.nearme.app.model.UserRole
import com.nearme.app.navigation.Screen
import com.nearme.app.ui.theme.NearMeTheme
import com.nearme.app.viewmodel.NearMeViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NearMeTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val viewModel: NearMeViewModel = viewModel()
                    NearMeApp(viewModel)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NearMeApp(viewModel: NearMeViewModel) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route
    val userRole by viewModel.userRole.collectAsState()

    Scaffold(
        topBar = {
            // Material 3 Top App Bar
            TopAppBar(
                title = {
                    Text(
                        text = if (userRole == UserRole.CUSTOMER) "NearMe" else "Owner Portal",
                        style = MaterialTheme.typography.titleLarge
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface,
                    titleContentColor = MaterialTheme.colorScheme.onSurface
                ),
                actions = {
                    // Quick Switch Role Chip
                    FilterChip(
                        selected = userRole == UserRole.BUSINESS_OWNER,
                        onClick = { viewModel.toggleRole() },
                        label = {
                            Text(
                                if (userRole == UserRole.CUSTOMER) "Customer" else "Owner",
                                style = MaterialTheme.typography.labelSmall
                            )
                        }
                    )
                }
            )
        },
        bottomBar = {
            // Show bottom navigation on main tabs
            val hideBottomBarRoutes = listOf(
                Screen.Splash.route,
                Screen.Welcome.route,
                Screen.Login.route,
                Screen.Register.route,
                Screen.RoleSelection.route
            )
            if (currentRoute !in hideBottomBarRoutes) {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surface
                ) {
                    if (userRole == UserRole.CUSTOMER) {
                        NavigationBarItem(
                            selected = currentRoute == Screen.CustomerHome.route,
                            onClick = { navController.navigate(Screen.CustomerHome.route) },
                            icon = { /* Home Icon */ },
                            label = { Text("Home") }
                        )
                        NavigationBarItem(
                            selected = currentRoute == Screen.NearbyList.route,
                            onClick = { navController.navigate(Screen.NearbyList.route) },
                            icon = { /* Explore Icon */ },
                            label = { Text("Explore") }
                        )
                        NavigationBarItem(
                            selected = currentRoute == Screen.MapView.route,
                            onClick = { navController.navigate(Screen.MapView.route) },
                            icon = { /* Map Icon */ },
                            label = { Text("Map") }
                        )
                        NavigationBarItem(
                            selected = currentRoute == Screen.CustomerProfile.route,
                            onClick = { navController.navigate(Screen.CustomerProfile.route) },
                            icon = { /* Profile Icon */ },
                            label = { Text("Profile") }
                        )
                    } else {
                        NavigationBarItem(
                            selected = currentRoute == Screen.OwnerDashboard.route,
                            onClick = { navController.navigate(Screen.OwnerDashboard.route) },
                            icon = { /* Dashboard Icon */ },
                            label = { Text("Dashboard") }
                        )
                        NavigationBarItem(
                            selected = currentRoute == Screen.OwnerBusinessProfile.route,
                            onClick = { navController.navigate(Screen.OwnerBusinessProfile.route) },
                            icon = { /* Business Icon */ },
                            label = { Text("Business") }
                        )
                        NavigationBarItem(
                            selected = currentRoute == Screen.ManageProducts.route,
                            onClick = { navController.navigate(Screen.ManageProducts.route) },
                            icon = { /* Products Icon */ },
                            label = { Text("Products") }
                        )
                        NavigationBarItem(
                            selected = currentRoute == Screen.OwnerProfile.route,
                            onClick = { navController.navigate(Screen.OwnerProfile.route) },
                            icon = { /* Profile Icon */ },
                            label = { Text("Profile") }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.CustomerHome.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.CustomerHome.route) {
                // Composable for Customer Home
            }
            composable(Screen.NearbyList.route) {
                // Composable for Nearby Directory
            }
            composable(Screen.MapView.route) {
                // Composable for Map Screen
            }
            composable(Screen.OwnerDashboard.route) {
                // Composable for Owner Dashboard
            }
            composable(Screen.VendorCheckIn.route) {
                // Composable for Vendor Live Check-In
            }
        }
    }
}
