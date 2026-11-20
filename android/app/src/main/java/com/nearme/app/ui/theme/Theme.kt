package com.nearme.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = ForestGreen,
    onPrimary = PureWhite,
    primaryContainer = LightGreen,
    onPrimaryContainer = ForestGreenDark,
    secondary = AccentOrange,
    onSecondary = PureWhite,
    secondaryContainer = Color(0xFFFFF2E2),
    onSecondaryContainer = AccentOrangeDark,
    background = PureWhite,
    onBackground = DarkCharcoal,
    surface = SurfaceLight,
    onSurface = DarkCharcoal,
    surfaceVariant = Color(0xFFEEF4F0),
    onSurfaceVariant = TextSecondary
)

@Composable
fun NearMeTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = Typography,
        content = content
    )
}
