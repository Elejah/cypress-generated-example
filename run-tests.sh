#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Running Cypress tests..."
if npx cypress run; then
    echo -e "${GREEN}Cypress tests passed!${NC}"
    
    echo "Running K6 tests..."
    if k6 cloud login --token 3824e1f901ebd8133901a905daf13d2bc4e5601a8e795214539944727fc7bab6 && \
       k6 cloud k6/fake-store-api-test.js; then
        echo -e "${GREEN}K6 tests passed!${NC}"
        echo "                                                       "
        echo " _____    ____    ____    ____    ______   _____        "
        echo "|  _ \\  / __ \\  / __ \\  / __ \\  |  ____| | ____|       "
        echo "| |_) || |  | || |  | || |  | || |__    | |__          "
        echo "|  __/ | |  | || |  | || |  | ||  __|   |___ \\         "
        echo "| |    | |__| || |__| || |__| || |____   ___) |        "
        echo "|_|     \\____/  \\____/  \____/ |______| |____/         "
        echo "                                                       "
    else
        echo -e "${RED}K6 tests failed!${NC}"
        exit 1
    fi
else
    echo -e "${RED}Cypress tests failed!${NC}"
    exit 1
fi 