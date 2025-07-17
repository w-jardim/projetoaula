#!/bin/bash
# scripts/generate-all-components.sh

echo "🚀 Gerando toda estrutura do ServControl Individual..."

# Layout
ng generate component layout/main-layout --standalone --style=scss --skip-tests
ng generate component layout/header --standalone --style=scss --skip-tests
ng generate component layout/sidebar --standalone --style=scss --skip-tests
ng generate component layout/footer --standalone --style=scss --skip-tests
ng generate component layout/loading --standalone --style=scss --skip-tests

# Auth
ng generate component auth/login --standalone --style=scss --skip-tests
ng generate component auth/register --standalone --style=scss --skip-tests
ng generate component auth/forgot-password --standalone --style=scss --skip-tests
ng generate component auth/reset-password --standalone --style=scss --skip-tests

# Profile
ng generate component profile/profile-view --standalone --style=scss --skip-tests
ng generate component profile/profile-edit --standalone --style=scss --skip-tests
ng generate component profile/settings --standalone --style=scss --skip-tests

# Dashboard
ng generate component dashboard/home --standalone --style=scss --skip-tests
ng generate component dashboard/widgets/stats-card --standalone --style=scss --skip-tests
ng generate component dashboard/widgets/financial-summary --standalone --style=scss --skip-tests
ng generate component dashboard/widgets/recent-services --standalone --style=scss --skip-tests
ng generate component dashboard/widgets/monthly-chart --standalone --style=scss --skip-tests
ng generate component dashboard/widgets/quick-actions --standalone --style=scss --skip-tests

# Services
ng generate component services/services-list --standalone --style=scss --skip-tests
ng generate component services/service-form --standalone --style=scss --skip-tests
ng generate component services/service-details --standalone --style=scss --skip-tests
ng generate component services/service-card --standalone --style=scss --skip-tests
ng generate component services/calendar-view --standalone --style=scss --skip-tests
ng generate component services/calendar-day --standalone --style=scss --skip-tests
ng generate component services/calendar-month --standalone --style=scss --skip-tests

# Financial
ng generate component financial/monthly-summary --standalone --style=scss --skip-tests
ng generate component financial/earnings-chart --standalone --style=scss --skip-tests
ng generate component financial/expenses-form --standalone --style=scss --skip-tests
ng generate component financial/projections --standalone --style=scss --skip-tests
ng generate component financial/reports --standalone --style=scss --skip-tests
ng generate component financial/widgets/balance-card --standalone --style=scss --skip-tests
ng generate component financial/widgets/goals-progress --standalone --style=scss --skip-tests
ng generate component financial/widgets/income-breakdown --standalone --style=scss --skip-tests

# Reports
ng generate component reports/reports-list --standalone --style=scss --skip-tests
ng generate component reports/report-viewer --standalone --style=scss --skip-tests
ng generate component reports/report-generator --standalone --style=scss --skip-tests
ng generate component reports/charts/service-hours-chart --standalone --style=scss --skip-tests
ng generate component reports/charts/earnings-trend-chart --standalone --style=scss --skip-tests

# Shared UI
ng generate component shared/ui/button --standalone --style=scss --skip-tests
ng generate component shared/ui/card --standalone --style=scss --skip-tests
ng generate component shared/ui/modal --standalone --style=scss --skip-tests
ng generate component shared/ui/toast --standalone --style=scss --skip-tests
ng generate component shared/ui/confirm-dialog --standalone --style=scss --skip-tests
ng generate component shared/ui/not-found --standalone --style=scss --skip-tests

# Shared Forms
ng generate component shared/forms/date-picker --standalone --style=scss --skip-tests
ng generate component shared/forms/time-picker --standalone --style=scss --skip-tests
ng generate component shared/forms/currency-input --standalone --style=scss --skip-tests
ng generate component shared/forms/phone-input --standalone --style=scss --skip-tests

# Shared Display
ng generate component shared/display/avatar --standalone --style=scss --skip-tests
ng generate component shared/display/badge --standalone --style=scss --skip-tests
ng generate component shared/display/status-chip --standalone --style=scss --skip-tests
ng generate component shared/display/progress-bar --standalone --style=scss --skip-tests

# Services
ng generate service core/supabase/supabase --skip-tests
ng generate service core/auth/auth --skip-tests
ng generate service core/storage/local-storage --skip-tests
ng generate service core/notification/notification --skip-tests
ng generate service core/theme/theme --skip-tests
ng generate service services/profile/profile --skip-tests
ng generate service services/user-services/user-services --skip-tests
ng generate service services/financial/financial --skip-tests
ng generate service services/reports/reports --skip-tests
ng generate service services/backup/backup --skip-tests

# Guards
ng generate guard core/guards/auth --skip-tests
ng generate guard core/guards/profile-complete --skip-tests

# Interceptors
ng generate interceptor core/interceptors/auth --skip-tests
ng generate interceptor core/interceptors/error --skip-tests
ng generate interceptor core/interceptors/loading --skip-tests

# Pipes
ng generate pipe shared/pipes/currency-br --standalone --skip-tests
ng generate pipe shared/pipes/cpf-mask --standalone --skip-tests
ng generate pipe shared/pipes/phone-mask --standalone --skip-tests
ng generate pipe shared/pipes/graduation --standalone --skip-tests
ng generate pipe shared/pipes/service-status --standalone --skip-tests
ng generate pipe shared/pipes/time-ago --standalone --skip-tests
ng generate pipe shared/pipes/duration --standalone --skip-tests

# Validators
ng generate class shared/validators/cpf-validator --skip-tests
ng generate class shared/validators/phone-validator --skip-tests
ng generate class shared/validators/date-range-validator --skip-tests
ng generate class shared/validators/service-time-validator --skip-tests

echo "✅ Estrutura completa gerada!"
echo "📂 Total de componentes: 45+"
echo "🔧 Total de serviços: 10+"
echo "🛡️ Guards e interceptors: 5"
echo "🔄 Pipes e validators: 11"
echo ""
echo "🚀 Próximos passos:"
echo "1. Configurar environment com Supabase"
echo "2. Implementar interfaces TypeScript"
echo "3. Configurar tema Material Design"
echo "4. Implementar serviços core"
