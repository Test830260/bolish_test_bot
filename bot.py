import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

BOT_TOKEN = "BU_YERGA_TOKENINGIZNI_QOYING"

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start(message: types.Message):
    await message.answer(
        "👋 Salom! Bosh Qotirmalar Botiga xush kelibsiz!\n\n"
        "🎮 O'yinlar:\n"
        "/sudoku - Sudoku o'yini\n\n"
        "Keyinchalik ko'proq o'yinlar qo'shiladi!"
    )

@dp.message(Command("sudoku"))
async def sudoku(message: types.Message):
    await message.answer("🧩 Sudoku tez orada ishga tushadi!")

async def main():
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
