from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    gemini_api_key: str
    model_config = SettingsConfigDict(env_file=".env")


# Instantiate the settings object to use across your app
settings = Settings()
